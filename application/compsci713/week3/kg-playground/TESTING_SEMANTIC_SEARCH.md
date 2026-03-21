# Testing the Enhanced Semantic Search

## Quick Test Guide

### Sample Text to Extract Triples From
```
Albert Einstein (1879-1955) was a theoretical physicist born in Germany. 
He is known for developing the theory of relativity. Einstein received 
the Nobel Prize in Physics in 1921 for his explanation of the photoelectric 
effect. He worked at Princeton University and lived in the United States. 
Einstein studied physics and mathematics at ETH Zurich.
```

### Test Questions

#### 1. Location Questions (Where)
- "Where was Einstein born?" → Expected: Germany
- "Where did Einstein work?" → Expected: Princeton University
- "Where did Einstein live?" → Expected: United States

#### 2. Time Questions (When)
- "When was Einstein born?" → Expected: 1879
- "When did Einstein die?" → Expected: 1955
- "When did Einstein receive the Nobel Prize?" → Expected: 1921

#### 3. What Questions
- "What did Einstein develop?" → Expected: Theory of Relativity
- "What did Einstein study?" → Expected: Physics and Mathematics
- "What prize did Einstein receive?" → Expected: Nobel Prize in Physics

#### 4. Fuzzy Matching Tests
- "Where was Albert born?" → Should match "Albert Einstein"
- "What did he invent?" → Should use pronoun resolution
- "Einstein's birthplace?" → Should understand implicit "where" question

#### 5. Synonym Tests
- "Where was Einstein employed?" → Should match "works_at"
- "What did Einstein create?" → Should match "developed"
- "Einstein's residence?" → Should match "lives_in"

### Expected Improvements

#### Better Entity Matching
- Partial names work: "Einstein" matches "Albert Einstein"
- Fuzzy matching handles typos and variations
- N-gram overlap catches phrase similarities

#### Smarter Predicate Matching
- "employed" → maps to "works_at"
- "created" → maps to "invented/developed"
- "residence" → maps to "lives_in"

#### Question Type Awareness
- "Where" questions prioritize location predicates
- "When" questions prioritize temporal predicates
- "What" questions work with multiple predicate types

#### Confidence Scores
- High confidence (80-99%): Strong matches with multiple scoring signals
- Medium confidence (60-79%): Good matches with some ambiguity
- Low confidence (40-59%): Weak matches, may need verification

### Testing Checklist

- [ ] Extract triples from sample text
- [ ] Test all "where" questions
- [ ] Test all "when" questions
- [ ] Test all "what" questions
- [ ] Test fuzzy matching with partial names
- [ ] Test synonym recognition
- [ ] Verify confidence scores are displayed
- [ ] Check that source triples are shown correctly
- [ ] Test with no matching triples (should show "not found")
- [ ] Test with empty question (button should be disabled)

### Advanced Test Cases

#### Multi-word Entities
```
The University of Auckland (UoA) is located in New Zealand. 
UoA was founded in 1883 and has around 45000 students.
```

Questions:
- "Where is the University of Auckland?" → New Zealand
- "When was UoA founded?" → 1883
- "How many students does UoA have?" → 45000 Students

#### Complex Relationships
```
Marie Curie was born in Poland and worked in France. 
She received the Nobel Prize in Physics in 1903 and 
the Nobel Prize in Chemistry in 1911.
```

Questions:
- "Where was Marie Curie born?" → Poland
- "Where did Curie work?" → France
- "What prizes did Marie Curie receive?" → Should find Nobel Prize triples

### Performance Expectations

- **Response Time**: Instant (< 100ms for typical knowledge graphs)
- **Accuracy**: 80%+ for well-formed questions
- **Confidence Calibration**: Higher scores should correlate with correct answers

### Debugging Tips

1. Check the browser console for any errors
2. Verify triples are extracted correctly in the Triple Viewer
3. Look at the source triple shown with each answer
4. Compare confidence scores across different questions
5. Test edge cases (very short questions, questions with no matches)

## Running the Tests

1. Start the development server:
   ```bash
   npm start
   ```

2. Open http://localhost:3000 in your browser

3. Paste the sample text into the text input area

4. Click "Extract Triples" to generate the knowledge graph

5. Try each test question in the Question Answering section

6. Observe:
   - Answer accuracy
   - Confidence scores
   - Source triples
   - Response time

## Success Criteria

✅ All test questions return relevant answers
✅ Confidence scores are displayed correctly
✅ Fuzzy matching works for partial entity names
✅ Synonym recognition improves predicate matching
✅ Question type detection boosts relevant predicates
✅ No false positives (irrelevant answers with high confidence)
✅ Graceful handling of no-match scenarios
