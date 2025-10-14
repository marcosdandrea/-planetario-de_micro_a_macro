import { build } from 'esbuild';
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

console.log('Building headless version...');

build({
    entryPoints: {
        main: 'src/app/main.ts'
    },
    outdir: 'dist/headless',
    entryNames: '[name]',
    bundle: true,
    platform: 'node',
    format: 'cjs',
    minify: true,
    keepNames: true,
    sourcemap: false,
    treeShaking: true,
    alias: {
        '@common': './src/common',
        '@src': './src/app/src',
        '@utils': './src/app/src/utils',
        '@assets': './src/app/src/assets',
        '@domain': './src/app/src/domain',
        '@services': './src/app/src/services',
        '@entities': './src/app/src/domain/entities',
        '@useCases': './src/app/src/domain/useCases',
    },
    external: [
        'electron',
        'fs',
        'path',
        'os',
        'url',
        'dotenv/config'
    ],
    define: {
        'process.env.HEADLESS': '"true"'
    }
}).then(() => {
    // Copy files for headless distribution
    try {
        copyFileSync(
            resolve('headless-package.json'),
            resolve('dist/headless/package.json')
        );
        console.log('Copied package.json for headless distribution');

        // Copy database folder
        const databaseSrc = resolve('database');
        const databaseDest = resolve('dist/headless/database');
        
        if (existsSync(databaseSrc)) {
            cpSync(databaseSrc, databaseDest, { recursive: true });
            console.log('Copied database folder for headless distribution');
        } else {
            console.warn('Database folder not found, skipping copy');
        }
                
    } catch (error) {
        console.error('Error copying files:', error);
    }
    
    console.log('Headless build completed successfully!');
}).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
});