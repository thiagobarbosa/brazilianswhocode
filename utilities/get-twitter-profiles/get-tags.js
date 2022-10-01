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

function getProfileLocation({ location }) {
  return {
    sp: includes(location, ["sao paulo", "sp"]),
    rj: includes(location, ["rio de janeiro", "rio", "rj"]),
    rs: includes(location, ["rio grande do sul", "porto alegre", "poa", "rs"]),
    rn: includes(location, ["rio grande do norte", "natal", "rn"]),
    df: includes(location, ["distrito federal", "brasilia", "brasilia/df", "df"]),
    am: includes(location, ["amazonas", "manaus", "am"]),
    se: includes(location, ["sergipe", "aracaju", "se"]),
    ba: includes(location, ["bahia", "porto seguro", "salvador", "ba"]),
    pe: includes(location, ["pernambuco", "recife", "pe"]),
    pa: includes(location, ["paraná", "maringá", "pa"]),
    mg: includes(location, ["minas gerais", "belo horizonte", "mg"]),
    sc: includes(location, ["Santa Catarina", "florianopolis", "floripa", "sc"]),
    
  };
}

function getProfileExpertise({ description }) {
  return {
    communitymanager: includes(description, ["community"]),
    dba: includes(description, ["dba", "database", "mysql", "sql", "nosql"]),
    backend: includes(description, ["backend", "back-end", "java", "python", "go"]),
    frontend: includes(description, [
      "javascript",
      "frontend",
      "front-end",
      "react",
      "vue-js",
      "vue",
    ]),
    mobile:
      includes(description, ["mobile", "ios", "android", "flutter"]) &&
      !includes(description, ["creative developer"]),
    management: includes(description, ["management", "leadership", "head", "manager", "lead"]),
    datascience: includes(description, ["data", "mathematician", "python"])
  };
}

function getProfilePosition({ description }) {
  return {
    founder: includes(description, ["founder"]),
    engineer: includes(description, ["engineer", "developer"]),
    freelance: includes(description, ["freelance", "freelancer"]),
    clevel: includes(description, ["CTO", "CIO"]),
  };
}



export default function getTags(profile) {
  return {
    location: deleteFalseFromObject(getProfileLocation(profile)),
    expertise: deleteFalseFromObject(getProfileExpertise(profile)),
    position: deleteFalseFromObject(getProfilePosition(profile)),
  };
}
