#!/bin/sh

firebase functions:config:set notifications.token="secret"

firebase functions:config:set mail.from="notify@juno.watch" mail.resend.api_key="secret"
