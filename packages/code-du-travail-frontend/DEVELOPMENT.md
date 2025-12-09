Developer notes — running frontend tests
======================================

If you see an error like:

  Error: Cannot find module '/path/to/repo/packages/code-du-travail-frontend/node_modules/jest/bin/jest.js'

it usually means the test runner (Lerna/npm) tried to execute the jest binary from inside the package folder while this repo uses Yarn workspaces and a hoisted dependency layout.

Quick workarounds / fixes
------------------------

- Make sure dependencies are installed at the workspace root:

  yarn install

- Use the Yarn workspace command to run the frontend tests (recommended for local dev):

  Run frontend tests:

  ```bash
  yarn workspace @cdt/frontend test:frontend
  ```

  Update snapshots:

  ```bash
  yarn workspace @cdt/frontend test:frontend:update
  ```

  Or run jest directly via the workspace:

  ```bash
  yarn workspace @cdt/frontend jest --updateSnapshot
  ```

Why this happens
-----------------

With Yarn 3 and workspaces the project can use a hoisted / repo-level node_modules layout. When tools like Lerna invoke package scripts using npm they sometimes resolve binary paths relative to the package folder and the binary may not be present there. Running the command through Yarn's workspace runner (as above) uses Yarn's resolution and avoids the missing-binary issue.

If this keeps happening in CI or in automated scripts, prefer calling the tests through Yarn workspaces in CI or ensure the test environment populates per-package node_modules (e.g. `yarn workspaces focus` or using `nodeLinker: node-modules`).
