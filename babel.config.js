const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
];


module.exports = { 
  presets,
  "ignore": [
    "node_modules"
  ]
};
