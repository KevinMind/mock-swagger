### Base Rollup Project

https://swagger.io/docs/specification/data-models/data-types/#array

Comprehensive coverage of valid swagger model data typings
https://swagger.io/docs/specification/data-models/data-types/

1. Identify base type
-primitive
  2. Identify sub type
  -simple
    -string
      3. valid input params
      -minLength
      -maxLength
      -format
        -date
        -date-time
        -password
        -byte
        -binary
        -email
        -uuid
        -uri
        -hostname
        -ipv4
        -ipv6
      -pattern
    -integer
      4. valid input params
        -format ['', 'int32', 'int64']
        -multipleOf 'number' forces number to be multiple of this number
        -minimum 'number'
        -maximum 'number'
        -exclusiveMinimum 'bool'
        -exclusiveMaximum 'bool'
    -number
      5. valid input params
        -format ['', 'float', 'double']
        -minimum 'number'
        -multipleOf 'number' forces number to be multiple of this number
        -maximum 'number'
        -exclusiveMinimum 'bool'
        -exclusiveMaximum 'bool'
    -boolean
      6. (can only be true or false strictly type enforced)
  -complex
    -object
      7. valid input params
        -properties (set of properties and their types)
        -required (set of property names that must exist)
        -additionalProperties bool | object defines limited or unlimited set of properties available to object without type definition
        -minProperties: number
        -maxProperties: number
    -array
      8. valid input params
        -items: 
        -minItems: 'number'
        -maxItems: 'number'
        -uniqueItems: 'bool'
    -files
      9. only file from derived properties
        - type 'string' format binary
        - type 'string' format byte
  -global input parameters
    -nullable 'bool' value can be json valid null
    -oneOf (used to replace fixed type with number of optional types)
      
-reference
  3. recursively define values from path of ref
  
