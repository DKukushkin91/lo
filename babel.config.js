export default {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        "@babel/plugin-transform-export-namespace-from",
        ["module-resolver", {
            root: ["."],
            extensions: [
                ".ios.ts",
                ".android.ts",
                ".ios.tsx",
                ".android.tsx",
                ".ts",
                ".tsx",
                ".jsx",
                ".js",
                ".json",
                ".png",
                ".jpg"
            ],
            alias: {
                "@app": "./src/app",
                "@pages": "./src/pages",
                "@widgets": "./src/widgets",
                "@features": "./src/features",
                "@entities": "./src/entities",
                "@shared": "./src/shared"
            }
        }],
    ],
    env: {
        development: {
            plugins: [["@babel/plugin-transform-react-jsx", { "runtime": "automatic" }]]
        }
    }
};
