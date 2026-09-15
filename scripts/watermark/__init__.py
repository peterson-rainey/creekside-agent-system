"""Vendored watermark removal scripts from guillaumemeyer/watermarks-remover.

Layer A: Deterministic Unicode cleaning (text_unicode.clean_text)
Humanizer: Deterministic phrase/dash/quote cleanup (humanize_pass.humanize_pass)
Scoring: Zero-LLM stylometry estimator (score_stylometry.score_text_stylometry)

All stdlib-only, no external dependencies.
"""

from .text_unicode import clean_text, inspect_text
from .humanize_pass import humanize_pass
from .score_stylometry import score_text_stylometry
