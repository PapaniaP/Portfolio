#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment process...${NC}"

# Build the site
echo -e "${BLUE}📦 Building the site...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "\033[0;31m❌ Build failed! Aborting deployment.${NC}"
    exit 1
fi

# Deploy using lftp (more reliable than standard ftp command)
echo -e "${BLUE}📤 Uploading to server...${NC}"
lftp -c "
open ftp://ftp.papaniap.dk;
user $FTP_USER $FTP_PASS;
mirror -R --delete --verbose ./dist/ /public_html/v2/;
bye;
"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${BLUE}🌎 Your site is now live at https://v2.papaniap.dk${NC}"
else
    echo -e "\033[0;31m❌ Deployment failed!${NC}"
    exit 1
fi