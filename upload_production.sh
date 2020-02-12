#!/bin/bash
DEVELOP_KEY=1hxN30vZcdqJ_OOQ9fQki8MEOOFVOueW8twlUIaLyhro8juwcvRk5c140

PRODUCTION_KEY=1xHXgPfdA0BwNciHfmTDHQNfvehjpm7dRt6pObLZD_LABg8Q3NQs26qO9

CLASP_FILE=.clasp.json

echo "Upload files to production"

echo "Are you sure(Y/n)?"

read SURE

echo ""

case $SURE in
    y)
        ;;
    Y)
        ;;
    *)
        echo 'Action canceled - Exit'

        exit 1
        ;;
esac

echo "Replace key for production..."

echo "{\"scriptId\":\"$PRODUCTION_KEY\"}" > $CLASP_FILE

cat $CLASP_FILE

echo "Upload files..."

clasp push

echo "Restore key to develop..."

echo "{\"scriptId\":\"$DEVELOP_KEY\"}" > $CLASP_FILE

cat $CLASP_FILE

echo "Done."