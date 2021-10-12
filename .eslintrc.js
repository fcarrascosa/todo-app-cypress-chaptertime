module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },

    "rules": {},
    "overrides": [
        {
            "files": ['cypress/**/*.js'],
            "extends": [
                "plugin:cypress/recommended"
            ]
        },

    ],
    "plugins": [
        "cypress"
    ]

};
