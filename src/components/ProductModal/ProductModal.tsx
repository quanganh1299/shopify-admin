import { Button, DropZone, Form, FormLayout, LegacyStack, Modal, TextField, Thumbnail } from "@shopify/polaris";
import { FC, useCallback, useEffect, useState } from "react";
import styles from './style.module.scss'
import { BlankIcon } from '@shopify/polaris-icons';
import { closeIcon, errorWarningIcon } from "../../assets/icon";

interface Props {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductModal: FC<Props> = (props) => {
  const { isOpen, onClose, title, setIsOpen } = props
  const [productTitle, setProductTitle] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [formError, setFormError] = useState({
    isProductTitle: false,
    isPrice: false,
    isFile: false,
    isInvalidFile: false,
  })

  const handleDropZoneDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const acceptedFile = acceptedFiles[0]
      if (acceptedFile && validImageTypes.includes(acceptedFile.type)) {
        setFile(acceptedFile);
      } else {
        setFormError((prevState) => ({ ...prevState, isInvalidFile: true }))
        setTimeout(() => {
          setFormError((prevState) => ({ ...prevState, isInvalidFile: false }))
        }, 2000)
      }
    }, []);

  const fileUpload = !file && <DropZone.FileUpload actionHint="Accepts image file .gif, .jpg, .png" actionTitle="Add file" />;

  const uploadedFile = file && (
    <LegacyStack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : BlankIcon
        }
      />
      <div>
        {file.name}{' '}
        <p>{file.size} bytes</p>
      </div>
    </LegacyStack>
  );

  const closeFile = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setFile(undefined)
  }

  const resetForm = () => {
    setIsSubmit(false)
    setProductTitle('')
    setFile(undefined)
    setDescription('')
    setPrice('')
  }

  const handleSubmit = useCallback(() => {
    setIsSubmit(true)
    if (Object.values(formError).every((value) => value === false)) {
      const data = {
        title: productTitle,
        price: Number(price.replace(/\./g, '')),
        file: file,
        description: description
      }
      alert('Gửi thông tin thành công, vui lòng xem kết quả ở log')
      console.log('Form Data', data)
      resetForm()
    }
  }, [formError]);

  const handleProductTitleChange = useCallback((value: string) => setProductTitle(value), []);
  const handlePriceChange = useCallback((value: string) => {
    if (value.startsWith('00')) {
      value = '0';
    }
    setPrice(value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  }, []);
  const handleDescriptionChange = useCallback((value: string) => setDescription(value), [])

  useEffect(() => {
    if (productTitle.trim() === '') {
      setFormError((prevState) => ({ ...prevState, isProductTitle: true }))
    }
    else setFormError((prevState) => ({ ...prevState, isProductTitle: false }))

    if (Number(price.replace(/\./g, '')) === 0) {
      setFormError((prevState) => ({ ...prevState, isPrice: true }))
    }
    else setFormError((prevState) => ({ ...prevState, isPrice: false }))

    if (file) {
      setFormError((prevState) => ({ ...prevState, isFile: false }))
    }
    else setFormError((prevState) => ({ ...prevState, isFile: true }))
  }, [productTitle, file, price])

  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        onClose={() => {
          resetForm()
          onClose()
        }
        }
      >
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={productTitle}
                onChange={handleProductTitleChange}
                label="Title"
                type="text"
                autoComplete="title"
                error={formError.isProductTitle && isSubmit ? 'Title is required' : undefined}
              />
              <TextField
                value={price}
                onChange={(value) => handlePriceChange(value)}
                label="Price"
                type="text"
                autoComplete="price"
                min={0}
                error={formError.isPrice && isSubmit ? 'Price can\'t be 0 and can\'t be empty' : undefined}
              />
              <DropZone
                label="Image"
                onDrop={handleDropZoneDrop}
                type="image"
                variableHeight
                allowMultiple={false}
              >
                <div className={styles.fileContainer}>
                  <div style={{ flex: 1 }}>
                    {uploadedFile}
                    {fileUpload}
                  </div>
                  {file
                    &&
                    <div
                      className={styles.closeIcon}
                      onClick={(e) => closeFile(e)}
                    >
                      {closeIcon}
                    </div>
                  }
                </div>
              </DropZone>
              {
                formError.isFile && isSubmit && !formError.isInvalidFile && (
                  <div className={styles.error}>
                    {errorWarningIcon}
                    <p className={styles.errorText}>
                      You have to upload a file
                    </p>
                  </div>
                )}
              {
                formError.isInvalidFile && (
                  <div className={styles.error}>
                    {errorWarningIcon}
                    <p className={styles.errorText}>
                      Your file is invalid
                    </p>
                  </div>
                )}
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                multiline={4}
                autoComplete="off"
              />
              <div className={styles.btnContainer}>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button submit variant="primary">Save</Button>
              </div>
            </FormLayout>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ProductModal