import countries from "../../countries.json"

function includes(description, terms) {
  return terms.some((term) => {
    // The terms should not appear within a word. This means that they must
    // include a space or any other non-letter.
    //
    // For example, we don't want "Oakland" to appear as "la" because Oakland
    // contains "la" within the string. We also want "writer/developer" to
    // register as both writer and developer.
    //
    // We add a space around `${description}` so that the regex captures
    // descriptions that start with the term. The regex alone is not able to
    // handle that.
    const regex = RegExp(`[\\W]${term}[\\W]`, "gi");
    return regex.test(` ${description} `);
  });
}

/**
 * Takes an object and removes and properties where the values are falsy. This
 * makes the tags objects much smaller since we'll only store the ones where
 * the tags are applicable.
 */
function deleteFalseFromObject(o) {
  Object.entries(o).forEach(([key, value]) => {
    if (!value) {
      delete o[key];
    }
  });

  return o;
}

function getProfileBrazilianLocation({ location }) {
  return {
    ac: includes(location, ["acre", "rio branco", "ac"]),
    al: includes(location, ["alagoas", "maceio", "maceió", "al"]),
    ap: includes(location, ["amapa", "amapá", "macapa", "macapá", "ap"]),
    am: includes(location, ["amazonas", "manaus", "am"]),
    ba: includes(location, ["bahia", "porto seguro", "salvador", "ba"]),
    ce: includes(location, ["ceara", "ceará", "fortaleza", "ce"]),
    df: includes(location, ["distrito federal", "brasilia", "brasília", "brasilia/df", "df"]),
    es: includes(location, ["espirito santo", "espírito santo", "vila velha", "es"]),
    go: includes(location, ["goiás", "goias", "goiânia", "goiania", "go"]),
    ma: includes(location, ["maranhão", "maranhao", "são luís", "sao luis", "ma"]),
    mt: includes(location, ["mato grosso", "cuiabá", "cuiaba", "mt"]),
    ms: includes(location, ["mato grosso do sul", "campo grande", "ms"]),
    mg: includes(location, ["minas gerais", "belo horizonte", "mg"]),
    pa: includes(location, ["pará", "para", "belém", "belem", "pa"]),
    pb: includes(location, ["paraíba", "paraiba", "joão pessoa", "joao pessoa", "pb"]),
    pr: includes(location, ["paraná", "curitiba", "curitiba", "maringá", "maringa", "pa"]),
    pe: includes(location, ["pernambuco", "recife", "pe"]),
    pi: includes(location, ["piauí", "piaui", "teresina", "pi"]),
    rj: includes(location, ["rio de janeiro", "rio", "rj"]),
    rn: includes(location, ["rio grande do norte", "natal", "rn"]),
    rs: includes(location, ["rio grande do sul", "porto alegre", "poa", "rs"]),
    ro: includes(location, ["rondônia", "rondonia", "porto velho", "ro"]),
    rr: includes(location, ["roraima", "boa vista", "rr"]),
    sc: includes(location, ["santa catarina", "florianópolis", "florianopolis", "floripa", "sc"]),
    sp: includes(location, ["são Paulo", "sao paulo", "sp"]),    
    se: includes(location, ["sergipe", "aracaju", "se"]),
    to: includes(location, ["tocantins", "palma", "to"])
  };
}

function getProfileExternalLocation({ location }) {
  const externalLocations = {}
  countries.map((item) => {
    externalLocations[item.id] = includes(location, Array(item.title))
  })
  return externalLocations
}

function getProfileExpertise({ description }) {
  return {
    communitymanager: includes(description, ["community"]),
    dba: includes(description, ["dba", "database", "mysql", "sql", "nosql"]),
    backend: includes(description, ["backend", "back-end", "java", "python", "go"]),
    frontend: includes(description, [
      "javascript",
      "web",
      "frontend",
      "front-end",
      "nodejs",
      "react",
      "vue-js",
      "vue",
    ]),
    mobile:
      includes(description, ["mobile", "ios", "android", "flutter"]) &&
      !includes(description, ["creative developer"]),
    management: includes(description, ["management", "leadership", "head", "manager", "lead"]),
    datascience: includes(description, ["data", "mathematician", "python", "dados"]),
    devops: includes(description, ["devops", "docker", "cloud"]),
    qa: includes(description, ["qa", "teste", "tests"])
  };
}

function getProfilePosition({ description }) {
  return {
    founder: includes(description, ["founder", "cofounder", "co-founder", "co-fundadora", "co-fundador"]),
    engineer: includes(description, ["engineer", "developer"]),
    freelance: includes(description, ["freelance", "freelancer"]),
    clevel: includes(description, ["CTO", "CIO"]),
  };
}



export default function getTags(profile) {
  return {
    brazilianLocation: deleteFalseFromObject(getProfileBrazilianLocation(profile)),
    externalLocation: deleteFalseFromObject(getProfileExternalLocation(profile)),
    expertise: deleteFalseFromObject(getProfileExpertise(profile)),
    position: deleteFalseFromObject(getProfilePosition(profile)),
  };
}
