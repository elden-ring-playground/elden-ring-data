# elden-ring-data

Elden Ring Data, extracted and translated to web-friendly formats like JSON.

## Data

### Localized messages

In-game text localized to other languages, such as:

- names and descriptions of items, NPCs, places
- dialogue from NPCs, menus, world interactions
- tips from loading screens and tutorials

Original: `ELDEN RING\Game\Data0.bdt`

Extracted: `ELDEN RING\Game\msg\{$LANG}\{$TYPE}.msgbnd.dcx`

Translated: `elden-ring-data\msg\{$LANG}\{$TYPE}.msgbnd.dcx.json`

### Icons

Refer to the `elden-ring-media` repo

### Other data

Coming soon

## How this data was generated

1. Used UXM_2.4_ER to extract game files
2. Used SoulsFormats to load, then export to JSON, using C# code similar to below

## Thanks

Meowmaritus: UXM_2.4_ER

JKAnderson: SoulsFormats
