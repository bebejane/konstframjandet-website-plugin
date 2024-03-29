import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, SelectField } from 'datocms-react-ui';
import { useEffect, useState } from 'react';

export type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};

export type DistrictUserOption = {
  label: string,
  value: string
}

export default function DistrictUserField({ ctx }: PropTypes) {

  const [options, setOptions] = useState<DistrictUserOption[] | undefined>()
  const [value, setValue] = useState<DistrictUserOption | undefined>()

  useEffect(() => {
    const options: DistrictUserOption[] = []

    Object.keys(ctx.users).forEach(k => options.push({
      label: `${ctx.users[k]?.attributes.full_name} (${ctx.users[k]?.attributes.email})`,
      value: ctx.users[k]?.attributes.email as string
    }))

    const currentValue = ctx.formValues[ctx.field.attributes.api_key];
    const currentOption = currentValue ? options.find(({ value }) => value === currentValue) : undefined
    setOptions(options)
    setValue(currentOption)

  }, [setOptions, ctx])

  useEffect(() => {
    if (!value || value.value === ctx.formValues[ctx.field.attributes.api_key]) return
    ctx.setFieldValue(ctx.field.attributes.api_key, value.value)

  }, [value, ctx])

  return (
    <Canvas ctx={ctx}>
      <SelectField
        id="district-user"
        name="district-user"
        label=""
        value={value}
        required={false}
        selectInputProps={{ isMulti: false, options }}
        onChange={(newValue) => { setValue(newValue as DistrictUserOption) }}
      />
    </Canvas>
  )
}