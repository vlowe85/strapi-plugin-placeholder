'use strict';

const { getService, canGeneratePlaceholder } = require('./utils');

module.exports = ({ strapi }) => {
  /* Generate a placeholder when a new image is uploaded or updates */

  const generatePlaceholder = async (event) => {
    const { data } = event.params;
    if (!canGeneratePlaceholder(data)) return;
    data.placeholder = await getService(strapi, 'placeholder').generate(data.url, 'f4f6f9');
    data.placeholder_dark = await getService(strapi, 'placeholder').generate(data.url, '2A3750');
  };

  strapi.db.lifecycles.subscribe({
    models: ['plugin::upload.file'],
    beforeCreate: generatePlaceholder,
    beforeUpdate: generatePlaceholder,
  });
};
