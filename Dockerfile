from node:20

WORKDIR /app

copy package.json /app/
copy packages/api/package.json /app/packages/api/
copy packages/app/package.json /app/packages/app/
copy packages/arborist/package.json /app/packages/arborist/
copy packages/mock-n7-ldap/package.json /app/packages/mock-n7-ldap/
copy yarn.lock /app/
copy .yarnrc.yml /app/
copy .yarn/ /app/.yarn/
copy .husky/ /app/
run yarn install 

copy . .
run yarn build

run rm -rf .git

RUN chmod +x /app/entrypoint.sh
