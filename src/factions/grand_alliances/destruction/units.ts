import { keyPicker, tagAs } from 'factions/metatagger'
import meta_rule_sources from 'meta/rule_sources'
import { TEffects } from 'types/data'
import {
  BATTLESHOCK_PHASE,
  CHARGE_PHASE,
  COMBAT_PHASE,
  DURING_GAME,
  DURING_SETUP,
  END_OF_COMBAT_PHASE,
  HERO_PHASE,
  SHOOTING_PHASE,
  START_OF_COMBAT_PHASE,
  TURN_TWO_END_OF_MOVEMENT_PHASE,
  WOUND_ALLOCATION_PHASE,
} from 'types/phases'
import DestructionCommandAbilities from './command_abilities'

const ShroudingMistEffects: TEffects[] = [
  {
    name: `Shrouding Mists`,
    desc: `Subtract 1 from hit rolls for attacks made with missile weapons that target this model.`,
    when: [SHOOTING_PHASE],
    shared: true,
  },
  {
    name: `Shrouding Mists`,
    desc: `Roll a D6 each time you allocate a mortal wound to this model. On a 5+ that mortal wound is negated.`,
    when: [WOUND_ALLOCATION_PHASE],
    shared: true,
  },
]
const UnnaturalFleshEffect = {
  name: `Unnatural Flesh`,
  desc: `In your hero phase, you can heal 1 wound allocated to this model.`,
  when: [HERO_PHASE],
  shared: true,
}
const BaleglyphMaulsEffect = {
  name: `Baleglyph Mauls`,
  desc: `If the unmodified wound roll for an attack made with a Baleglyph Maul is 6, that attack inflicts 1 mortal wound on the target in addition to any normal damage.`,
  when: [COMBAT_PHASE],
  shared: true,
}

const DestructionUnits = {
  Basilisk: {
    effects: [
      {
        name: `Corrosive Miasma`,
        desc: `At the start of the combat phase, roll 1 dice for each enemy unit within 3" of this model. On a 2+, that unit suffers 1 mortal wound.`,
        when: [START_OF_COMBAT_PHASE],
      },
      {
        name: `Malignant Gaze`,
        desc: `In your hero phase, you can pick 1 enemy unit within 12" of this model that is visible to it, and roll a D6. On a 1, nothing happens. On a 2-3, that unit suffers D3 mortal wounds. On a 4+, that unit suffers D3+1 mortal wounds.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Dread Maw': {
    effects: [
      {
        name: `Devourer From Below`,
        desc: `Instead of setting up this model on the battlefield, you can place it to one side and say that it is tunnelling through the earth in reserve. If you do so, at the end of your second movement phase, you must set up this model on the battlefield more than 9" from any enemy units.`,
        when: [DURING_SETUP, TURN_TWO_END_OF_MOVEMENT_PHASE],
      },
      {
        name: `Impenetrable Hide`,
        desc: `Roll a D6 each time you allocate a mortal wound to this model. On a 4+ that mortal wound is negated.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Yawning Maw`,
        desc: `You can reroll wound rolls of 1 for attacks made with this model's Cavernous Maw if the target unit has a Wounds characteristic of 2 or less.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Tunnel Worm`,
        desc: `When this model makes a move, it can pass across terrain features and other models in the same manner as a model that can fly.`,
        when: [DURING_GAME],
      },
    ],
  },
  'Fimirach Noble': {
    mandatory: {
      command_abilities: [keyPicker(DestructionCommandAbilities, ['Born to Lead'])],
    },
    effects: [...ShroudingMistEffects, UnnaturalFleshEffect, BaleglyphMaulsEffect],
  },
  'Fimir Warriors': {
    effects: [...ShroudingMistEffects, UnnaturalFleshEffect, BaleglyphMaulsEffect],
  },
  'Incarnate Elemental Of Beasts': {
    effects: [
      {
        name: `Savage Frenzy`,
        desc: `If this model is slain, before removing the model from play, it can make a pile-in move and then attack with all of the melee weapons it is armed with. This model is then removed from play.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Incarnate of Ghur`,
        desc: `In your hero phase, you can heal up to D3 wounds allocated to this model if the battle is taking place in Ghur, the Realm of Beasts. In addition, you can reroll wound rolls of 1 for attacks made by this model if the battle is taking place in Ghur, the Realm of Beasts.`,
        when: [HERO_PHASE],
      },
      {
        name: `The Lure of Spirit Blood`,
        desc: `You can reroll charge rolls for this model while it is within 12" of any enemy models that have any wounds allocated to them.`,
        when: [CHARGE_PHASE],
      },
      {
        name: `Howl of the Great Beast`,
        desc: `Subtract 1 from the Bravery characteristic of enemy units while they are within 8" of this model.`,
        when: [DURING_GAME, BATTLESHOCK_PHASE],
      },
    ],
  },
  'Incarnate Elemental Of Fire': {
    effects: [
      {
        name: `Ashes to Ashes`,
        desc: `If the unmodified hit roll for an attack made by this model is 6, double the Damage characteristic for that attack.`,
        when: [SHOOTING_PHASE, COMBAT_PHASE],
      },
      {
        name: `Gift of Elemental Fire`,
        desc: `At the end of the combat phase, roll a D6 for each enemy unit within 3" of this model. On a 2+, that unit suffers D3 mortal wounds.`,
        when: [END_OF_COMBAT_PHASE],
      },
      {
        name: `Incarnate of Aqshy`,
        desc: `In your hero phase, you can heal up to D3 wounds allocated to this model if the battle is taking place in Aqshy, the Realm of Fire. In addition, you can reroll wound rolls of 1 for attacks made by this model if the battle is taking place in Aqshy, the Realm of Fire.`,
        when: [HERO_PHASE],
      },
    ],
  },
  'Magma Dragon': {
    effects: [
      {
        name: `Brimstone Dragonfire`,
        desc: `Do not use the attack sequence for an attack made with this model's Brimstone Dragonfire. Instead, roll a D6. On a 2+, the target unit suffers D6 mortal wounds. If the target unit has 10 or more models, it suffers 2D6 mortal wounds instead of D6.`,
        when: [SHOOTING_PHASE],
      },
      {
        name: `Burning Blood`,
        desc: `Roll a D6 each time a wound or mortal wound that was inflicted by a melee weapon is allocated to this model. On a 4+, the attacking unit suffers 1 mortal wound. On a 6, the attacking unit suffers D3 mortal wounds instead.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
    ],
  },
  Merwyrm: {
    effects: [
      {
        name: `Abyssal Predator`,
        desc: `If the unmodified wound roll for an attack made with this model's Hideous Jaws is 6, that attack has a Damage characteristic of D6 instead of D3.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Stench of the Deep`,
        desc: `Subtract 1 from hit rolls for attacks made with melee weapons that target this model.`,
        when: [COMBAT_PHASE],
      },
      {
        name: `Unnatural Metabolism`,
        desc: `At the end of the combat phase, if any enemy models were slain by wounds inflicted by this model's attacks in that combat phase, you can heal up to D3 wounds allocated to this model.`,
        when: [END_OF_COMBAT_PHASE],
      },
    ],
  },
  'Rogue Idol': {
    effects: [
      {
        name: `Avalanche!`,
        desc: `If this model is slain, before removing the model from play, roll a D6 for each unit within 3" of this model. On a 4+, that unit suffers D3 mortal wounds. This model is then removed from play.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Da Big' Un`,
        desc: `Roll a D6 each time you allocate a wound or mortal wound to this model. On a 5+, that wound or mortal wound is negated.`,
        when: [WOUND_ALLOCATION_PHASE],
      },
      {
        name: `Livin' Idol`,
        desc: `Add 1 to casting rolls for friendly Orruk WIZARDS and friendly Grot WIZARDS while they are within 6" of any friendly models with this ability. In addition, add 1 to the Bravery characteristic of friendly Orruk and friendly Grot units while they are wholly within 18" of any friendly models with this ability.`,
        when: [HERO_PHASE],
      },
      {
        name: `Rubble and Ruin`,
        desc: `At the end of the combat phase, roll a D6 for each enemy unit within 3" of this model. On a 4+, that unit suffers 1 mortal wound.`,
        when: [END_OF_COMBAT_PHASE],
      },
      {
        name: `Spirit of the Waaagh!`,
        desc: `You can reroll hit rolls of 1 for attacks made by this model if it made a charge move in the same turn.`,
        when: [COMBAT_PHASE],
      },
    ],
  },
  Kragnos: {
    effects: [
      {
        name: `Bellow of Rage`,
        desc: `At the end of each phase, if this model has allocated any wounds that have not been negated, roll a D6 for each unit and defensible terrain within 6" of this model. Each roll succeeds if it is greater than or equal to the value in the damage table. 
               Success against unit targets inflict D3 mortal wounds, while success against terrain demolishes that terrain. If the terrain was garrisoned, roll a D6 for each model in the garrison unit. On a 1, that model is slain. Place the survivors within 6" of the terrain feature and more than 3" from enemy units.`,
        when: [DURING_GAME],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `Destroyer of the Draconith Empire`,
        desc: `You can reroll charge rolls while this model is within 12" of any enemy Stardrakes, Drakes, Dracoths, or Dracolines.`,
        when: [CHARGE_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `Destroyer of the Draconith Empire`,
        desc: `You can reroll hit rolls while this model is within 12" of any enemy Stardrakes, Drakes, Dracoths, or Dracolines.`,
        when: [COMBAT_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `Rampaging Destruction`,
        desc: `After making a charge move, choose to either roll a D6 for each enemy unit within 1" or roll 2D6 against 1 enemy MONSTER within 1".
               If targeting all units in 1", roll a D6 for each". On a 2+ that unit suffers D6 mortal wounds.
               If targeting a MONSTER, roll 2D6. No effect on a roll of 7. All other values inflict mortal wounds equal to the roll multiplied together.`,
        when: [CHARGE_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `Icon of Destruction`,
        desc: `Add 1 to the Bravery characterisitic for friendly DESTRUCTION models wholly within 12" of this model.`,
        when: [DURING_GAME],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `The Shield Inviolate`,
        desc: `Roll 3D6 each time this model is affected by a spell or endless spell. If the roll is a greater than the casting value on the spell's warscroll, it has no effect on this model.`,
        when: [HERO_PHASE],
        rule_sources: [meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS],
      },
      {
        name: `Warmaster`,
        desc: `This unit can be included in an Orruk Warclans, Gloomspite Gitz, Ogor Mawtribes or Sons of Behemat army. If it is, it is treated as a general even if it is not the model picked to be the army's general, and you can still use the army's allegiance abilities even if this unit is not from the army's faction.`,
        when: [DURING_GAME],
        rule_sources: [
          meta_rule_sources.BOOK_BROKEN_REALMS_KRAGNOS,
          meta_rule_sources.ERRATA_BROKEN_REALMS_KRAGNOS_JULY_2021,
        ],
      },
    ],
  },
}

export default tagAs(DestructionUnits, 'unit')
