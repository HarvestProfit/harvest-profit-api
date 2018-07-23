import { AsyncStorage } from 'react-native';

const getState = async () => {
  console.log(AsyncStorage);
  const savedState = await AsyncStorage.getItem('state');
  if (savedState) {
    return JSON.parse(savedState);
  }

  return {};
};

const saveState = state => AsyncStorage.setItem('state', JSON.stringify(state));

class Storage {
  cache = {}

  init = new Promise(async (resolve) => {
    this.cache = await getState();
    resolve();
  });

  /**
   * Get the current value of the property, or returns undefined.
   * @param {string} property The property to get
   * @return {any} The value of the property
   */
  get(property) {
    return this.cache[property];
  }

  /**
   * Sets a value for a given property.
   * @param {string} property The property to identify the value as
   * @param {any} value The value to save
   * @return {boolean} The successful save
   */
  async set(property, value) {
    if (this.cache[property] === value) return;

    this.cache[property] = value;

    await saveState(this.cache);
    // eslint-disable-next-line
    return true;
  }

  /**
   * Delete a current property
   * @param {string} property The property to delete
   * @return {any} The successful delete
   */
  async remove(property) {
    delete this.cache[property];

    await saveState(this.cache);

    return true;
  }
}

export default new Storage();
