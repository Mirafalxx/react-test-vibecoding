import { useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";

const { TextArea } = Input;

function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const textareaRef = useRef(null);

  // ✅ Открытие модалки и фокус сразу в обработчике клика
  const handleOpen = () => {
    setOpen(true);

    // Фокус через ref с небольшой задержкой, чтобы элемент успел вставиться в DOM
    setTimeout(() => {
      textareaRef.current?.resizableTextArea?.textArea?.focus();
    }, 50);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFinish = (values) => {
    console.log("Значения формы:", values);
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Открыть форму #3
      </Button>

      <Modal title="Форма обратной связи" open={open} onCancel={handleCancel} footer={null} destroyOnHidden>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="message" label="Сообщение" rules={[{ required: true, message: "Пожалуйста, введите сообщение" }]}>
            <TextArea
              ref={textareaRef}
              rows={4}
              placeholder="Введите ваше сообщение..."
              autoFocus // запасной вариант для ПК/Android
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default FeedbackModal;
