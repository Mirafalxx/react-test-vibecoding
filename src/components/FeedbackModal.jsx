import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";

const { TextArea } = Input;

function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const textareaRef = useRef(null);

  const handleOpen = () => setOpen(true);

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleFinish = (values) => {
    console.log("Значения формы:", values);
    handleCancel();
  };

  // ✅ фокус при открытии
  useEffect(() => {
    if (open) {
      // маленькая задержка, чтобы DOM точно был готов
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [open]);

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Открыть форму
      </Button>

      <Modal
        title="Форма обратной связи"
        open={open}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden
        // ❗️ убрали destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="message" label="Сообщение" rules={[{ required: true, message: "Пожалуйста, введите сообщение" }]}>
            <TextArea ref={textareaRef} rows={4} placeholder="Введите ваше сообщение..." />
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
