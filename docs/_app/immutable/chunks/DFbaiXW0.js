import {
	f as A,
	h as L,
	P as D,
	g as P,
	i as T,
	j as b,
	k as B,
	b as Y,
	l as h,
	m as x,
	D as M,
	o as N,
	u as U,
	q,
	v as w,
	w as $,
	x as j,
	S as z,
	L as C
} from './rvO96ovo.js';
import { c as G } from './CtaFTir0.js';
function F(r, a, t, s) {
	var f = !q || (t & w) !== 0,
		v = (t & N) !== 0,
		E = (t & j) !== 0,
		n = s,
		S = !0,
		g = () => (S && ((S = !1), (n = E ? U(s) : s)), n),
		u;
	if (v) {
		var O = z in r || C in r;
		u = A(r, a)?.set ?? (O && a in r ? (e) => (r[a] = e) : void 0);
	}
	var _,
		I = !1;
	(v ? ([_, I] = G(() => r[a])) : (_ = r[a]),
		_ === void 0 && s !== void 0 && ((_ = g()), u && (f && L(), u(_))));
	var i;
	if (
		(f
			? (i = () => {
					var e = r[a];
					return e === void 0 ? g() : ((S = !0), e);
				})
			: (i = () => {
					var e = r[a];
					return (e !== void 0 && (n = void 0), e === void 0 ? n : e);
				}),
		f && (t & D) === 0)
	)
		return i;
	if (u) {
		var R = r.$$legacy;
		return function (e, l) {
			return arguments.length > 0 ? ((!f || !l || R || I) && u(l ? i() : e), e) : i();
		};
	}
	var c = !1,
		d = ((t & $) !== 0 ? T : b)(() => ((c = !1), i()));
	v && P(d);
	var m = x;
	return function (e, l) {
		if (arguments.length > 0) {
			const o = l ? P(d) : f && v ? B(e) : e;
			return (Y(d, o), (c = !0), n !== void 0 && (n = o), e);
		}
		return (h && c) || (m.f & M) !== 0 ? d.v : P(d);
	};
}
export { F as p };
