"""setup(): first cell of every notebook - finds the repo root, loads .env, reports LIVE/OFFLINE."""
import os, sys, pathlib


def setup(verbose: bool = True):
    here = pathlib.Path.cwd()
    root = next((p for p in [here, *here.parents] if (p / "agentkit").is_dir()), None)
    if root and str(root) not in sys.path:
        sys.path.insert(0, str(root))
    try:
        from dotenv import load_dotenv
        load_dotenv((root or here) / ".env")
    except ImportError:
        pass
    live = bool(os.getenv("ANTHROPIC_API_KEY")) and os.getenv("AGENTKIT_OFFLINE") != "1"
    if verbose:
        print("mode:", "LIVE (Claude)" if live else "OFFLINE (scripted replay - free)", "| repo root:", root)
    return root
