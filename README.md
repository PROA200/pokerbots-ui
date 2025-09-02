# Play against our 2025 pokerbot!
_created with Jordan Lefkowitz_

- second place overall (first freshman team)
- UI built with Vite + React + TypeScript
- backend built with FastAPI + Python, with a Postgres database on Supabase.
- bot uses Monte-Carlo CFR, with some tricks.

- _Broken? Let me know!_

## About the variant

Bounty Hold'em is a variant of No-Limit Texas Hold'em. The modification in the competition variant is that, every 25 rounds, each player is privately assigned a _bounty rank_ (e.g. 2 or A). If a player wins when the (up to 7) cards consisting of their private cards and the current board includes their bounty rank, they win 1.5 times the chips they would have normally won, and ten more. Here, the number of chips they would have originally won is all of the chips their opponent has bet, not the whole pot.

For simplicity (and since I don't expect anyone to play 25 rounds), bounty ranks are randomized _every round_. 

Find more detailed rules in [the variant handbook](https://github.com/mitpokerbots/class-resources-2025/blob/main/variant.pdf).

Ready? Play at https://proa200.github.io/pokerbots-ui/!
