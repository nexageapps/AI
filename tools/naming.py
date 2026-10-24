"""Single definition of the naming convention (see CURRICULUM.md §6)."""
import re

ID_RE = r"(?:B|I|A|AG|AP|E)\d{2}[a-z]?"
FILE_RE = re.compile(rf"^{ID_RE}-[a-z0-9]+(?:-[a-z0-9]+)*\.ipynb$")
LEGACY_RE = re.compile(r"^([A-Z]{1,2}\d{2}[a-z]?) - (.+)\.ipynb$")


def slugify(text: str) -> str:
    s = text.lower().replace("&", " and ").replace("+", " plus ")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def lesson_filename(lesson_id: str, title: str) -> str:
    """('AG03', 'Tools Done Right') -> 'AG03-tools-done-right.ipynb'"""
    return f"{lesson_id}-{slugify(title)}.ipynb"
