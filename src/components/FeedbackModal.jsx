import { useRef, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'

const { TextArea } = Input

function FeedbackModal() {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const textareaRef = useRef(null)

  const handleOpen = () => setOpen(true)

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  // Фокус на textarea после завершения анимации открытия модалки
  const handleAfterOpenChange = (visible) => {
    if (visible && textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleFinish = (values) => {
    console.log('Значения формы:', values)
    handleCancel()
  }

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Открыть форму
      </Button>

      <Modal
        title="Форма обратной связи"
        open={open}
        onCancel={handleCancel}
        afterOpenChange={handleAfterOpenChange}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            name="message"
            label="Сообщение"
            rules={[{ required: true, message: 'Пожалуйста, введите сообщение' }]}
          >
            <TextArea
              ref={textareaRef}
              rows={4}
              placeholder="Введите ваше сообщение..."
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
  )
}

export default FeedbackModal
