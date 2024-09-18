module.exports = {
  jsx: {
    babelConfig: {
      plugins: [
        // Plugin to remove specific attributes from certain SVG elements
        [
          "@svgr/babel-plugin-remove-jsx-attribute",
          {
            elements: ["svg", "path", "circle", "rect", "ellipse"],
            attributes: ["width", "height", "fill", "data-name", "id", "style"],
          },
        ],
      ],
    },
  },
  // Use a custom template to control the naming of React components
  template: (variables, { tpl }) => {
    // Remove 'Svg' prefix from component name, if present
    const componentName = variables.componentName.replace(/^Svg/, "");

    return tpl`
      import React from 'react';

      const ${componentName} = (${variables.props}) => (
        ${variables.jsx}
      );

      export default ${componentName};
    `;
  },
};
