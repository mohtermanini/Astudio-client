class ObjectUtils {
  getValueByPath = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };
}

export default new ObjectUtils();
