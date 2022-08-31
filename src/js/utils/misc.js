const GetAbilities = (abilities) => abilities && abilities.map(ability => ability.ability.name);

const GetTypes = (types) => types && types.map(type => type.type.name)

export {
    GetAbilities,
    GetTypes
}