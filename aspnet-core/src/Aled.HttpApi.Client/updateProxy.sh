# You should run this with Git Bash to avoid errors 

# shellcheck disable=SC2046
export $(grep -v '^#' ../.env | xargs)

abp generate-proxy -t csharp -u "https://localhost:44387"