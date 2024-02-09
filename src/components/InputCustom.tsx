import { IInputProps, Input, FormControl } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function InputCustom({ errorMessage = null, isInvalid, ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;


  return (
    <FormControl isInvalid={invalid} mb={4}>
      <Input
        w='full'
        bg='gray.700'
        h={14}
        borderWidth={0}
        fontSize='md'
        color='white'
        fontFamily='body'
        placeholderTextColor='gray.300'
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500'
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>

    </FormControl>
  )
}