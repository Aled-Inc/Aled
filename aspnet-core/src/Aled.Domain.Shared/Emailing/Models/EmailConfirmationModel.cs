namespace Aled.Emailing.Models;

public class EmailConfirmationModel
{
    public EmailConfirmationModel(string username, string emailconfirmationcode)
    {
        Username = username;
        Emailconfirmationcode = emailconfirmationcode;
    }

    public string Username { get; set; }
    public string Emailconfirmationcode { get; set; }
}