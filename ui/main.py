import tkinter as tk
from tkinter import messagebox

def submit_credentials():
    username = entry_username.get()
    password = entry_password.get()

    if username and password:
        messagebox.showinfo("Success", f"Username: {username}\nPassword: {password}")
    else:
        messagebox.showerror("Error", "Please enter both username and password")

# Create main window
root = tk.Tk()
root.title("Login App")

# Create and place widgets
label_username = tk.Label(root, text="Username:")
label_username.grid(row=0, column=0, padx=10, pady=10)

entry_username = tk.Entry(root)
entry_username.grid(row=0, column=1, padx=10, pady=10)

label_password = tk.Label(root, text="Password:")
label_password.grid(row=1, column=0, padx=10, pady=10)

entry_password = tk.Entry(root, show="*")
entry_password.grid(row=1, column=1, padx=10, pady=10)

button_submit = tk.Button(root, text="Submit", command=submit_credentials)
button_submit.grid(row=2, column=0, columnspan=2, pady=10)

# Run the Tkinter event loop
root.mainloop()
