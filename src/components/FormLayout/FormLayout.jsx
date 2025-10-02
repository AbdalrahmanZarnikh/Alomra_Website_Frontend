import Field from "../FormCommon/Field/Field";
import FieldSelector from "../FormCommon/FieldSelector/FieldSelector";
import FieldCheckbox from "../FormCommon/FieldCheckbox/FieldCheckbox";
import ButtonFrom from "../FormCommon/ButtonForm/ButtonFrom";
import UploadMultipleFiles from "../UploadMultipleFiles/UploadMultipleFiles";

const FormLayout = ({
  contentFormFilds,
  contentFormFieldsSelector,
  contentFormFieldsCheckBox,
  multipleImages,
  image = false,
  form,
  data,
  id,
  isLoading,
  Submit,
  total,
}) => {
  return (
    <>
      <form className="student-form-form" onSubmit={Submit}>
        {/* Form Fields */}

        {contentFormFilds?.length > 0 &&
          contentFormFilds.map((ele) => {
            return (
              <Field
                type={ele.type}
                label={ele.label}
                placeholder={ele.placeholder}
                register={ele.register}
                required={ele.required}
                errors={ele.errors}
                nameInDocument={ele.nameInDocument}
              />
            );
          })}

        {contentFormFieldsSelector?.length > 0 &&
          contentFormFieldsSelector.map((ele) => {
            return (
              <FieldSelector
                data={ele.data}
                errors={ele.errors}
                option={ele.option}
                register={ele.register}
                label={ele.label}
                required={ele.required}
                nameInDocument={ele.nameInDocument}
              />
            );
          })}

        {contentFormFieldsCheckBox?.length > 0 &&
          contentFormFieldsCheckBox.map((ele) => {
            return (
              <FieldCheckbox
                labelOne={ele.labelOne}
                labelTwo={ele.labelTwo}
                register={ele.register}
                nameInDocument={ele.nameInDocument}
                errors={ele.errors}
              />
            );
          })}

        {multipleImages && <UploadMultipleFiles form={form} records={data} />}

        <ButtonFrom id={id} isLoading={isLoading} />
        {total > 0 && <h1 className="m-auto font-bold">التكلفة الإجمالية : <span className="text-red-600 font-bold text-xl">{total} </span>$</h1>}
      </form>
    </>
  );
};

export default FormLayout;
