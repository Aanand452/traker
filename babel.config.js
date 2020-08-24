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
  ],
  "plugins": [
    [
      "module-resolver",
      {
        "alias": {
          "@sara/common/src": "@sara/common/build",
          "@sara/db/src": "@sara/db/build",
          "@sara/server/src": "@sara/server/build"
        }
      }
    ]
  ]
};
