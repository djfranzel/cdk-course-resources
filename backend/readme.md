* manually confirms and activates a cognito user
aws cognito-idp admin-set-user-password --user-pool-id us-west-2_c8nORdtY9 --username david.franzel --password "Qwe123\$\$" --permanent

* deploys the application and saves outputs into a local file
cdk deploy --all --outputs-file outputs.json