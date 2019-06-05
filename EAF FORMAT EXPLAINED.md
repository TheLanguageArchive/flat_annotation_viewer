** Toplevel Tier:
- allemaal alignable
- dus ALTIJD begin/eind tijd (ref1, ref2 timeslot)
- geen linguistic type constraint attribute

** Tier met een parent:
- Symbolic_Association
- Symbolic_Subdivision
- Time_Subdivision
- Included_In

*** Symbolic_Association:
- Allemaal Ref annotations
- annotation_ref naar de parent => volg de parent ref tot je alignable annotation vindt
- alignable annotation heeft de timeslot ref

*** Symbolic_Subdivision
- Allemaal Ref annotations
- annotation_ref naar de parent => volg de parent ref tot je alignable annotation vindt
- sommige hebben een previous annotation ref => dit bepaalt volgorde
- groepeer ref annotations naar annotation_ref binnen de tier
- resolven van tijd van boven naar beneden de tree

*** Time_Subdivision
- Allemaal alignable annotations
- mogelijk geen tijd ref1, ref2 timeslot leeg
- mogelijk sommige wel tijd, andere niet binnen de tier
- de vorige annotation virtual tijden bereken je door te kijken naar een timeslot ref met een echte tijdstip
  en de vorige annotations opdelen

*** Included_In
- Allemaal alignable annotations
- allemaal ref1, ref2 timeslots
