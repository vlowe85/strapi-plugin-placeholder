'use strict';

const { getPlaiceholder } = require('plaiceholder');
const { getService } = require('../utils');

module.exports = ({ strapi }) => ({
  /**
   * Generates a blurhash placeholder image for the given image.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @returns {Promise<string>} a blurhash encoded placeholder image
   */

  async generate(url) {
    try {
      const settings = getService(strapi, 'settings').get();
      const { blurhash } = await getPlaiceholder(url, settings);
      return blurhash.hash;
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },
});
