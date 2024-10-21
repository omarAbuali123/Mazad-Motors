const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      data: savedContact,
      message: 'تم إرسال رسالتك بنجاح'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'حدث خطأ أثناء إرسال الرسالة',
      error: error.message
    });
  }
};
