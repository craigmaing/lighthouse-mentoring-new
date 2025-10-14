#!/bin/bash

# Convert US English to UK English spellings across all source files

echo "Converting US English to UK English..."

# Find all relevant files (excluding node_modules, dist, .git)
FILES=$(find src -type f \( -name "*.astro" -o -name "*.md" -o -name "*.ts" -o -name "*.css" \))

for file in $FILES; do
  # Skip if file doesn't exist
  [ ! -f "$file" ] && continue

  # Common US -> UK conversions
  sed -i 's/\borganize\b/organise/g' "$file"
  sed -i 's/\borganizes\b/organises/g' "$file"
  sed -i 's/\borganized\b/organised/g' "$file"
  sed -i 's/\borganizing\b/organising/g' "$file"
  sed -i 's/\borganization\b/organisation/g' "$file"
  sed -i 's/\borganizations\b/organisations/g' "$file"
  sed -i 's/\borganizational\b/organisational/g' "$file"

  sed -i 's/\brealize\b/realise/g' "$file"
  sed -i 's/\brealizes\b/realises/g' "$file"
  sed -i 's/\brealized\b/realised/g' "$file"
  sed -i 's/\brealizing\b/realising/g' "$file"
  sed -i 's/\brealization\b/realisation/g' "$file"

  sed -i 's/\bbehavior\b/behaviour/g' "$file"
  sed -i 's/\bbehaviors\b/behaviours/g' "$file"
  sed -i 's/\bbehavioral\b/behavioural/g' "$file"

  sed -i 's/\bcenter\b/centre/g' "$file"
  sed -i 's/\bcenters\b/centres/g' "$file"
  sed -i 's/\bcentered\b/centred/g' "$file"
  sed -i 's/\bcentering\b/centring/g' "$file"

  sed -i 's/\bcolor\b/colour/g' "$file"
  sed -i 's/\bcolors\b/colours/g' "$file"
  sed -i 's/\bcolored\b/coloured/g' "$file"

  sed -i 's/\bfavor\b/favour/g' "$file"
  sed -i 's/\bfavors\b/favours/g' "$file"
  sed -i 's/\bfavored\b/favoured/g' "$file"

  sed -i 's/\bhonor\b/honour/g' "$file"
  sed -i 's/\bhonors\b/honours/g' "$file"
  sed -i 's/\bhonored\b/honoured/g' "$file"

  sed -i 's/\blabor\b/labour/g' "$file"
  sed -i 's/\blabors\b/labours/g' "$file"

  sed -i 's/\bneighbor\b/neighbour/g' "$file"
  sed -i 's/\bneighbors\b/neighbours/g' "$file"

  # -ize to -ise (but be careful with some words)
  sed -i 's/\bspecialize\b/specialise/g' "$file"
  sed -i 's/\bspecialized\b/specialised/g' "$file"
  sed -i 's/\bspecializes\b/specialises/g' "$file"
  sed -i 's/\bspecializing\b/specialising/g' "$file"

  sed -i 's/\brecognize\b/recognise/g' "$file"
  sed -i 's/\brecognized\b/recognised/g' "$file"
  sed -i 's/\brecognizes\b/recognises/g' "$file"
  sed -i 's/\brecognizing\b/recognising/g' "$file"

  sed -i 's/\boptimize\b/optimise/g' "$file"
  sed -i 's/\boptimized\b/optimised/g' "$file"
  sed -i 's/\boptimizes\b/optimises/g' "$file"
  sed -i 's/\boptimizing\b/optimising/g' "$file"

  sed -i 's/\banalyze\b/analyse/g' "$file"
  sed -i 's/\banalyzed\b/analysed/g' "$file"
  sed -i 's/\banalyzes\b/analyses/g' "$file"
  sed -i 's/\banalyzing\b/analysing/g' "$file"

  sed -i 's/\bprioritize\b/prioritise/g' "$file"
  sed -i 's/\bprioritized\b/prioritised/g' "$file"
  sed -i 's/\bprioritizes\b/prioritises/g' "$file"
  sed -i 's/\bprioritizing\b/prioritising/g' "$file"

  sed -i 's/\bmaximize\b/maximise/g' "$file"
  sed -i 's/\bmaximized\b/maximised/g' "$file"
  sed -i 's/\bmaximizes\b/maximises/g' "$file"
  sed -i 's/\bmaximizing\b/maximising/g' "$file"

  sed -i 's/\bminimize\b/minimise/g' "$file"
  sed -i 's/\bminimized\b/minimised/g' "$file"
  sed -i 's/\bminimizes\b/minimises/g' "$file"
  sed -i 's/\bminimizing\b/minimising/g' "$file"
done

# Also update the URL structure reference if it exists
sed -i 's/organizational-wellbeing/organisational-wellbeing/g' astro.config.mjs 2>/dev/null || true
sed -i 's/organizational-wellbeing/organisational-wellbeing/g' netlify.toml 2>/dev/null || true

echo "Conversion complete!"
echo "Files processed: $(echo "$FILES" | wc -l)"
