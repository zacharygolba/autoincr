# autoincr

Use auto-incrementing values safely and effectively. Overflows are checked when
you use a bounded number type (such as `number`) and there is optional support
for the new unbounded `bigint` type.

## Usage

```typescript
import * as assert from "assert";
import autoincr from "autoincr";

const id = autoincr();

assert.eq(id.next(), 1);
assert.eq(id.next(), 2);
assert.eq(id.next(), 3);

id.reset();
assert.eq(id.next(), 1);
```

### BigInt Support

The same API expressed in the example above can optionally return a `bigint`
rather than a `number` by calling the `.bigint` method.

```typescript
const id = autoincr.bigint();
```

## License

Licensed under either of

- Apache License, Version 2.0
  ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license
  ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

## Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
