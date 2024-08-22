# Inventory_managment_system

cloudlinux-selector install-modules --json --interpreter nodejs --user huludeig --app-root inventory.huludelala.com/codebase/backend

source /home/huludeig/nodevenv/inventory.huludelala.com/codebase/backend/20/bin/activate && cd /home/huludeig/inventory.huludelala.com

/usr/bin/flock -n /tmp/mylockenv.lock ${HOME}/nodevenv/inventory.huludelala.com/codebase/backend/20/bin/node ${HOME} inventory.huludelala.com/codebase/backend/app.js>/dev/null 2>&1

