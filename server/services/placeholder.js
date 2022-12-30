'use strict';

const { getPlaiceholder } = require('plaiceholder');
const { getService } = require('../utils');

module.exports = ({ strapi }) => ({
  /**
   * Generates a blurhash placeholder image for the given image.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @param {string} colour the bg colour to add if png
   * @returns {Promise<string>} a blurhash encoded placeholder image
   */

  async generate(url, colour) {
    try {
      const settings = getService(strapi, 'settings').get();
      const { blurhash } = await getPlaiceholder(this.getUrl(url, colour), settings);
      return blurhash.hash;
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },

  /**
   * If the url is a png, presume it needs a transparency fix and add a bg colour.
   * @param {string} url a local or remote image URL to generate a placeholder for
   * @param {string} colour the bg colour to add if png
   * @returns {string} an image url
   */

  getUrl(url, colour) {
    if(url.endsWith('.png')) {
      return `https://dev-image-processing.my-possible-self.com/v1/fill?url=${url}&bg_colour=${colour}&size=400&quality=50`;
    } else {
      return url;
    }
  },
});
