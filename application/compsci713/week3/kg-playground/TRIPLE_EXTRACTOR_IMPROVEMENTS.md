# Triple Extractor Improvements

## Enhanced Pattern Recognition

### Pronoun Resolution (NEW!)
The extractor now understands pronouns (he, she, it, they) and links them to the previously mentioned subject:

**Example:**
- Input: "Marie Curie was born in Poland. She worked in Chemistry. She is a singer."
- Output:
  - (Marie Curie, born_in, Poland)
  - (Marie Curie, works_at, Chemistry)
  - (Marie Curie, is_a, Singer)

The system tracks the last mentioned subject across sentences and automatically replaces pronouns with the correct entity name.

### New Patterns Added (15+ new patterns)
1. **Death/Passing**: "died in 1955", "passed away on April 18, 1955"
2. **Location variants**: "based in", "situated in" (in addition to "located in")
3. **Alternative names**: "called", "referred to as" (in addition to "known as")
4. **Ordinal rankings**: Supports "65th", "1st", "2nd" in rankings
5. **Education**: "graduated from", "attended"
6. **Authorship**: "wrote", "authored", "published", "composed"
7. **Relationships**: "married to", "parent of", "child of"
8. **Professional**: "specializes in", "focuses on", "contributes to", "collaborates with"
9. **Employment variants**: "employed by" (in addition to "works at/in/for")
10. **Research**: "researches", "pioneered" (in addition to "studies", "invented")
11. **Residence**: "resides in" (in addition to "lives in")
12. **Teaching**: "instructs" (in addition to "teaches")
13. **Ownership**: "owned by" (in addition to "belongs to")
14. **Awards**: "awarded" (in addition to "won", "received")
15. **Verb tense support**: Better handling of past/present tense variations

### Improved Alias Extraction
- **Acronyms**: "University of Auckland (UoA)" → also_known_as triple
- **Year ranges**: "Albert Einstein (1879-1955)" → born_in + died_in triples
- **Birth years**: "Marie Curie (born 1867)" → born_in triple

### Better Text Cleaning
- Improved clause splitting with more delimiters (while, whereas, although, though, who, whom, whose)
- Better removal of trailing prepositional phrases
- Handles ordinal numbers (1st, 2nd, 65th)
- Preserves date formatting with underscores for readability
- Special character handling (&→And, +→Plus, @→At)

### Enhanced Validation
- Length checks to avoid overly long entities (max 100 chars)
- Skip bare numbers as subjects (except years)
- Better stop word filtering
- Improved duplicate detection

### Smarter Missing Link Suggestions
- Confidence scoring based on shared connections
- Returns top 5 suggestions sorted by confidence
- Removed unused `text` parameter for cleaner API

## Example Improvements

### Pronoun Resolution
**Input:** "Marie Curie was born in Poland. She worked in Chemistry. She is a singer."

**Before:**
- (Marie Curie, born_in, Poland)
- (Marie Curie, works_at, Chemistry)
- ❌ "She is a singer" → Not extracted (pronoun not understood)

**After:**
- (Marie Curie, born_in, Poland)
- (Marie Curie, works_at, Chemistry)
- ✅ (Marie Curie, is_a, Singer) → Pronoun resolved correctly!

### Other Improvements

### Before
- "Einstein died in 1955" → ❌ Not extracted
- "Marie Curie (1867-1934)" → Only extracts acronym alias
- "Newton graduated from Cambridge" → ❌ Not extracted

### After
- "Einstein died in 1955" → ✅ (Einstein, died_in, 1955)
- "Marie Curie (1867-1934)" → ✅ (MarieCurie, born_in, 1867) + (MarieCurie, died_in, 1934)
- "Newton graduated from Cambridge" → ✅ (Newton, attended, Cambridge)

## Technical Improvements
- **Pronoun resolution**: Tracks last subject across sentences and replaces he/she/it/they
- Fixed unused parameter warning in `suggestMissingLinks`
- Better pattern ordering (most specific to least specific)
- Improved normalization for dates and special characters
- Enhanced entity quality checks
- Cross-sentence context tracking for better extraction
