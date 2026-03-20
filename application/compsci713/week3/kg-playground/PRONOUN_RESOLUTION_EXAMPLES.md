# Pronoun Resolution Examples

The triple extractor now intelligently resolves pronouns (he, she, it, they) by tracking the last mentioned subject across sentences.

## How It Works

1. **Track Subject**: When a sentence mentions a person/entity, it's remembered as the "last subject"
2. **Replace Pronouns**: In the next sentence, pronouns are automatically replaced with the last subject
3. **Continue Tracking**: The system continues tracking across multiple sentences

## Examples

### Example 1: Person with Multiple Facts
```
Input: "Marie Curie was born in Poland. She worked in Chemistry. She is a singer."

Extracted Triples:
1. (Marie Curie, born_in, Poland)
2. (Marie Curie, works_at, Chemistry)
3. (Marie Curie, is_a, Singer)
```

### Example 2: Organization
```
Input: "University of Auckland is located in New Zealand. It was founded in 1883. It has 45000 students."

Extracted Triples:
1. (University Of Auckland, located_in, New Zealand)
2. (University Of Auckland, founded_in, 1883)
3. (University Of Auckland, has, 45000 Students)
```

### Example 3: Multiple Entities
```
Input: "Einstein was born in Germany. He invented relativity. Newton was born in England. He invented calculus."

Extracted Triples:
1. (Einstein, born_in, Germany)
2. (Einstein, invented, Relativity)
3. (Newton, born_in, England)
4. (Newton, invented, Calculus)
```
Note: When a new subject is mentioned (Newton), the pronoun tracking switches to the new subject.

### Example 4: Mixed Pronouns
```
Input: "Tesla invented AC current. He was born in Serbia. He worked in electricity."

Extracted Triples:
1. (Tesla, invented, AC Current)
2. (Tesla, born_in, Serbia)
3. (Tesla, works_at, Electricity)
```

### Example 5: Compound Sentences with "and"
```
Input: "Marie Curie studied physics and she received Nobel Prize."

Extracted Triples:
1. (Marie Curie, studies, Physics)
2. (Marie Curie, received, Nobel Prize)
```

## Supported Pronouns

- **he** - masculine singular
- **she** - feminine singular  
- **it** - neuter singular
- **they** - plural or gender-neutral

## Limitations

1. **Ambiguity**: If multiple entities are mentioned in one sentence, the last one becomes the subject
2. **Distance**: Works best within 2-3 sentences; very distant references may not resolve correctly
3. **Context Switch**: When a new subject is introduced, pronouns refer to the new subject

## Tips for Best Results

✅ **Good**: "Einstein was born in Germany. He studied physics."
✅ **Good**: "The university is in Auckland. It was founded in 1883."
❌ **Avoid**: "Einstein and Newton were scientists. He invented relativity." (ambiguous - which "he"?)

## Technical Implementation

The pronoun resolution works by:
1. Tracking `lastSubject` across sentence processing
2. Using regex to replace pronouns at sentence start: `/^(he|she|it|they)\s+/i`
3. Replacing pronouns after "and": `/\s+and\s+(he|she|it|they)\s+/gi`
4. Returning the current subject for the next sentence to use
