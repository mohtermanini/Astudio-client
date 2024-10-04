import DataTypesUtils from "./DataTypesUtils";

class FormUtils {
  arrayToSelect2List(array, idColumn = "id", labelColumn = "name") {
    if (!array) {
      return null;
    }
    return array?.map((object) => this.objectToSelect2Option(object, idColumn, labelColumn));
  }

  objectToSelect2Option(object, idColumn = "id", labelColumn = "name") {
    if (!object) {
      return null;
    }
    return { label: object[labelColumn], value: object[idColumn] };
  }

  checkIfSelectFieldObject(value) {
    return DataTypesUtils.isDefined(value) && typeof value === "object" && Object.keys(value).length === 2 && "label" in value && "value" in value;
  }

  async submitForm({ data, mutation, successMessage, setError }) {
    try {
      const reshapedData = this.reshapeFormData(data);
      const result = await mutation(reshapedData);
      if (result?.error) throw result.error;
      return result?.data;
    } catch (error) {
      if ((error.status === 422 || error.status === 400) && setError) {
        let errorObject = error.data.errors;
        if (errorObject) {
          Object.keys(errorObject).forEach((errorKey) => {
            setError(errorKey, { type: "custom", message: errorObject[errorKey][0] });
          });
        } else {
          errorObject = error.data;
          errorObject.map((error) => {
            setError(error.propertyName.charAt(0).toLowerCase() + error.propertyName.slice(1), { type: "custom", message: error.errorMessage });
          });
        }
      }
      throw error;
    }
  }

  reshapeFormData(data) {
    const reshapedData = {};
    Object.keys(data).forEach((key) => {
      let value = data[key];
      if (value === null) return;
      if (Array.isArray(value)) {
        if (value.length > 0 && this.checkIfSelectFieldObject(value[0])) {
          value = value.map((object) => object.value);
        }
        reshapedData[key] = value;
        return;
      }
      if (this.checkIfSelectFieldObject(value)) {
        reshapedData[key] = value.value;
        return;
      }
      reshapedData[key] = value;
    });
    return reshapedData;
  }

  reshapeToParams(data) {
    if (!data) return null;
    const params = new URLSearchParams();

    Object.keys(data).forEach((key) => {
      let value = data[key];
      if (value === null) return;

      if (Array.isArray(value)) {
        value.forEach((element) => {
          if (this.checkIfSelectFieldObject(element)) {
            element = element.value;
          }
          params.append(key, element);
        });
        return;
      }

      if (this.checkIfSelectFieldObject(value)) {
        params.append(key, value.value);
        return;
      }
      params.append(key, value);
    });

    return params;
  }
}

export default new FormUtils();
