"""Build the silent product demonstration using the supplied product assets.

Requires Pillow and imageio-ffmpeg. No source PDFs are modified.
"""
from pathlib import Path
import math
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '.tools/video'))
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

W, H, FPS = 960, 720, 24
INK, CREAM, ORANGE, YELLOW = '#123f45', '#fffaf3', '#ef804d', '#f5c65d'
fonts = Path('C:/Windows/Fonts')
def font(size, bold=False):
    return ImageFont.truetype(str(fonts / ('segoeuib.ttf' if bold else 'segoeui.ttf')), size)

scenes = [
    (3, ['Frações para', 'ver, explorar', 'e entender.'], 'Kit Frações na Prática', 'combo.png', '4º E 5º ANO • MATERIAL DIGITAL'),
    (4, ['28 atividades.', 'Um percurso', 'de descobertas.'], 'Propostas progressivas', 'atividade.webp', 'PÁGINA REAL DO KIT'),
    (3.5, ['10 recursos.', 'Frações que', 'ganham forma.'], 'Tiras, discos, retas e mais', 'tiras.webp', 'PÁGINA REAL DO KIT'),
    (3.5, ['4 jogos.', 'Conecte ideias', 'brincando.'], 'Com orientações de montagem', 'jogo.webp', 'PÁGINA REAL DO KIT'),
    (3, ['No combo:', '+ 20 planos', 'de aula.'], 'Adaptáveis ao 4º e 5º ano', 'plano.webp', 'PÁGINA REAL DOS PLANOS'),
    (3, ['Material pronto.', 'Planejamento', 'com você.'], 'Conheça as duas opções na página', 'combo.png', 'KIT + 20 PLANOS DE AULA'),
]
assets = {name: Image.open(ROOT / 'dist/assets' / name).convert('RGBA') for _,_,_,name,_ in scenes}

def draw_scene(index, progress):
    _, lines, sub, name, label = scenes[index]
    canvas = Image.new('RGB', (W,H), INK)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((40,35,326,81), radius=10, fill=YELLOW)
    draw.text((58,39), 'FRAÇÕES NA PRÁTICA', font=font(22,True), fill=INK)
    draw.text((42,128), 'VER. MONTAR. EXPLICAR.', font=font(26,True), fill='#bad4ca')
    for line_no, line in enumerate(lines):
        draw.text((40,199+line_no*75), line, font=font(56,True), fill=ORANGE if line_no==1 else CREAM)
    # Short supporting text is broken intentionally to stay readable in mobile playback.
    words = sub.split(); rows=[]; row=''
    for word in words:
        candidate=(row+' '+word).strip()
        if draw.textlength(candidate,font=font(27))>450:
            rows.append(row);row=word
        else: row=candidate
    rows.append(row)
    for n,row in enumerate(rows): draw.text((42,471+n*38),row,font=font(27),fill='#d8e7df')
    # Real pages enter gently; do not fabricate physical handling or classroom use.
    image = assets[name].copy()
    photo = name.endswith('.png')
    max_w,max_h=(370,400) if photo else (330,466)
    image.thumbnail((max_w,max_h),Image.Resampling.LANCZOS)
    scale=1+.025*progress
    image=image.resize((round(image.width*scale),round(image.height*scale)),Image.Resampling.LANCZOS)
    x=round(723-image.width/2+14*(1-min(1,progress*5)))
    y=round(338-image.height/2-5*math.sin(progress*math.pi))
    draw.rounded_rectangle((x-12,y-12,x+image.width+12,y+image.height+12),radius=16,fill='#305a5c')
    canvas.paste(image,(x,y),image)
    draw=ImageDraw.Draw(canvas)
    draw.text((42,620),label,font=font(24,True),fill=YELLOW)
    if photo: draw.text((566,560),'Capa ilustrativa · Produto em PDF',font=font(19),fill='#c4d8cf')
    draw.rectangle((0,H-9,W,H),fill='#305a5c')
    cumulative=sum(s[0] for s in scenes[:index])+scenes[index][0]*progress
    draw.rectangle((0,H-9,round(W*cumulative/20),H),fill=ORANGE)
    return canvas

out=ROOT/'dist/assets/kit-demonstracao.mp4'
command=[imageio_ffmpeg.get_ffmpeg_exe(),'-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(out)]
process=subprocess.Popen(command,stdin=subprocess.PIPE)
poster=draw_scene(0,.4)
poster.save(ROOT/'dist/assets/video-poster.webp','WEBP',quality=90)
qa=ROOT/'qa/video';qa.mkdir(parents=True,exist_ok=True)
try:
    for i,(seconds,*_) in enumerate(scenes):
        draw_scene(i,.5).save(qa/f'scene-{i+1}.jpg',quality=90)
        frames=round(seconds*FPS)
        for n in range(frames):
            frame=draw_scene(i,n/max(1,frames-1))
            # Brief fade-through-teal keeps all transitions smooth without flashes.
            fade=min(1, n/5 if i else 1, (frames-1-n)/5 if i < len(scenes)-1 else 1)
            if fade<1: frame=Image.blend(Image.new('RGB',(W,H),INK),frame,max(0,fade))
            process.stdin.write(frame.tobytes())
finally:
    process.stdin.close()
if process.wait(): raise RuntimeError('FFmpeg encoding failed')
print(f'Created {out.name}: 20 seconds, {W}x{H}, silent, {out.stat().st_size:,} bytes')
