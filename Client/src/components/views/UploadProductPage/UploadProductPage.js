import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Kabul" },
  { key: 2, value: "Mazar-e-Sharef" },
  { key: 3, value: "Herat" },
  { key: 5, value: "Panjsher" },
  { key: 8, value: "Kandahar" },
  { key: 10, value: "Nangarhar" },
];
const Category = [
  { key: 1, value: "Properties" },
  { key: 2, value: "Cars" },
  { key: 3, value: "Electronics" },
  { key: 4, value: "Furniture" },
  { key: 5, value: "Jobs" },
  { key: 6, value: "Mobiles" },
  { key: 7, value: "Bikes" },
  { key: 8, value: "Education" },
  { key: 9, value: "Fashion" },
  { key: 10, value: "Pets" },
  { key: 11, value: "Services" },
  { key: 12, value: "Handicrafts" },
];

function UploadProductPage(props) {
  const { t } = useTranslation();
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [ContinentValue, setContinentValue] = useState(1);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Properties");

  const [Images, setImages] = useState([]);
  

  const [TitleError, setTitleError] = useState();
  const [DescError, setDescError] = useState();
  const [PriceError, setPriceError] = useState();
  const [PhoneError, setPhoneError] = useState();
  const [LocError, setLocError] = useState();


  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onPhoneChange = (event) => {
    setPhone(event.currentTarget.value);
  };
  const onLocationChange = (event) => {
    setLocation(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };
  const onCategoryChange = (event) => {
    setCategory(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  
 
      
  const onSubmit = (event) => {
    event.preventDefault();

    const inputTitle = t('PleaseInputTitle.1');
    const inputDescription = t('PleaseInputDescription.1');
    const inputPrice = t('PleaseInputPrice.1');
    const inputPhone = t('PleaseInputPhone.1');
    const phoneCorrect = t('PhoneNumberShouldBeCorrect.1');
    const inputLocation = t('PleaseInputLocation.1')
    const fillAllFields = t('PleaseFillAlltheFieldsFirst.1')
    if (TitleValue=== '') {
      setTitleError(inputTitle);
 } else {
     setTitleError('');
 }

 if (DescriptionValue=== '') {
   setDescError(inputDescription)
  } else {
  setDescError('')
 }

 if (PriceValue === '') {
   setPriceError(inputPrice)
  } else {
  setPriceError('')
 }

 if (phone === '') {
   setPhoneError(inputPhone)
   
  } 
  else if (phone.length <=9 || phone.length >10) {
    setPhoneError(phoneCorrect)

  }
  else {
  setPhoneError('')
 }

 if (location === '') {
   setLocError(inputLocation)
  } else {
  setLocError('')
 }

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      Images === undefined ||
      Images.length == 0 ||
      !phone ||
      !category
    ) {
      return (
        toast(fillAllFields), { autoClose: 1000 }
      );
      // <ToastContainer />;
      //return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      cities: ContinentValue,
      phone: phone,
      location: location,
      Category: category,
      report: "null",
    };

    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        props.history.push("/");

        return toast.info("Posted", { autoClose: 2000 });
      } else {
        alert("Failed to upload Product");
      }
    });
  };


  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>{t("PostFreeAd.1")}</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}

        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>{t("Title.1")}</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <span style = {{color :"red"}} >{TitleError}</span>
        <br />
        <br />
        <label>{t("Description.1")}</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <span style = {{color :"red"}} >{DescError}</span>
        <br />
        <br />
        <label>{t("Price.1")}</label>
        <Input onChange={onPriceChange} type="number" />
        <span style = {{color :"red"}} >{PriceError}</span>
        <br />
        <br />

        <label>{t("Phone.1")}</label>
        <Input
          
          onChange={onPhoneChange}
          value={phone}
          type="number"
        />
        <span style = {{color :"red"}} >{PhoneError}</span>
        <br />
        <br />
        <label>{t("Location.1")}</label>
        <Input
          placeholder={t("YourLocation.1")}
          onChange={onLocationChange}
          type="text"
        />
        <span style = {{color :"red"}} >{LocError}</span>
        <br />
        <br />

        <span
          style={{
            marginRight: "40px",
            fontFamily: "verdana",
            fontSize: "15px",
          }}
        >
          {t("SelectCity.1")}
        </span>

        <select
          onChange={onContinentsSelectChange}
          style={{ marginRight: "100px" }}
        >
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>

        <span
          style={{
            marginRight: "40px",
            fontFamily: "verdana",
            fontSize: "15px",
          }}
        >
          {t("SelectCategory.1")}
        </span>

        <select onChange={onCategoryChange}>
          {Category.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button style={{ alignContent: "center" }} onClick={onSubmit}>
          {t("Submit.1")}
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
}

export default UploadProductPage;
