"""Empacota somente a pasta pública, sem dependências externas."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import subprocess

root = Path(__file__).resolve().parent.parent
subprocess.run(["node", str(root / "scripts/verify.mjs")], check=True)
public = root / "dist"
target = root / "release/kit-fracoes-landing-page.zip"
target.parent.mkdir(exist_ok=True)
with ZipFile(target, "w", ZIP_DEFLATED) as archive:
    for path in sorted(public.rglob("*")):
        if path.is_file():
            archive.write(path, path.relative_to(public).as_posix())
with ZipFile(target) as archive:
    assert "index.html" in archive.namelist()
    assert archive.testzip() is None
print(f"Pacote pronto: {target} ({target.stat().st_size:,} bytes)")
