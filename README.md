# Ultimate TypeScript

My solutions for Code with Mosh's "The Ultimate TypeScript Course", one self-contained folder per section: the
end-of-section exercises (sections 003–007, one file per exercise), the lesson code for the sections without
exercises, and the course's React and Express reminders projects. Type-level answers are checked by `tsc` with
`@ts-expect-error`; everything else has node:test or Vitest tests. Also includes my implementation of
[`@ultimate/vault`](https://github.com/ultimatecourses/vault) by Ultimate Courses.

| #   | Section                             | Project                                                                        | Covers                                                                                    |
| --- | ----------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 002 | Getting Started with TypeScript     | [Getting-Started](002-Getting-Started)                                         | a first program, compiler options, source maps for debugging                              |
| 003 | Fundamentals                        | [Fundamentals](003-Fundamentals)                                               | exercises: annotations, arrays and tuples, enums, functions, objects                      |
| 004 | Advanced Types                      | [Advanced-Types](004-Advanced-Types)                                           | exercises: type aliases, unions, literal types, optional chaining, nullish coalescing, `unknown` |
| 005 | Classes, Interfaces and OOP         | [Classes-Interfaces-And-OOP](005-Classes-Interfaces-And-OOP)                   | exercises: Logger, getters, inheritance, private vs protected, interfaces                 |
| 006 | Generics                            | [Generics](006-Generics)                                                       | exercises: generic functions and classes, constraints, `keyof`                            |
| 007 | Decorators                          | [Decorators](007-Decorators)                                                   | exercise: a parameterized class decorator                                                 |
| 008 | Modules                             | [Modules](008-Modules)                                                         | named, default and wildcard imports, re-exporting                                         |
| 009 | Integration with JavaScript         | [Integration-With-JavaScript](009-Integration-With-JavaScript)                 | `allowJs`, `checkJs`, JSDoc types, a declaration file, `@types/lodash`                    |
| 010 | React with TypeScript               | [Reminders-App](010-React-With-TypeScript/Reminders-App)                       | typed components and props, state and effect hooks, calling the backend, a form (Vite)   |
| 011 | Node and Express with TypeScript    | [Reminders-Api](011-Node-And-Express-With-TypeScript/Reminders-Api)            | an Express app, a router, a DTO and model, parsing request bodies                         |
| –   | Ultimate Courses vault              | [vault](vault/src/lib/vault.ts)                                                | a typed localStorage / sessionStorage wrapper with prefixes and change events             |

## Run

```bash
cd 006-Generics
npm install
npm test     # compiles with tsc, then runs the tests
```

The React app runs with `npm start` (Vite); the API with `npm start` on http://localhost:8000.

## Vault

`new Vault({ type: 'local' | 'session', prefix })` with `set<T>`, `get<T>`, `remove`, `removeAll`, `onChange` (returns
an unsubscribe function), `value`, `length` and `isSupported`. Values are stored as JSON. With a prefix, keys are
stored as `<prefix>-<key>` and every method, including `removeAll`, `value` and `length`, only sees that vault's keys.

## Certificate

[Code with Mosh · The Ultimate TypeScript Course, April 2023](Resources/Certificate.pdf)
