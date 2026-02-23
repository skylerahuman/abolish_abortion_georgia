import {
	a5 as d,
	a$ as p,
	b0 as E,
	b1 as h,
	m,
	M as f,
	aa as o,
	aI as T,
	ac as g,
	a3 as c,
	b2 as N,
	a9 as b
} from './rvO96ovo.js';
function v(r) {
	var a = document.createElement('template');
	return ((a.innerHTML = r.replaceAll('<!>', '<!---->')), a.content);
}
function n(r, a) {
	var e = m;
	e.nodes === null && (e.nodes = { start: r, end: a, a: null, t: null });
}
function x(r, a) {
	var e = (a & E) !== 0,
		l = (a & h) !== 0,
		t,
		i = !r.startsWith('<!>');
	return () => {
		if (f) return (n(o, null), o);
		t === void 0 && ((t = v(i ? r : '<!>' + r)), e || (t = d(t)));
		var s = l || p ? document.importNode(t, !0) : t.cloneNode(!0);
		if (e) {
			var _ = d(s),
				u = s.lastChild;
			n(_, u);
		} else n(s, s);
		return s;
	};
}
function w(r, a, e = 'svg') {
	var l = !r.startsWith('<!>'),
		t = `<${e}>${l ? r : '<!>' + r}</${e}>`,
		i;
	return () => {
		if (f) return (n(o, null), o);
		if (!i) {
			var s = v(t),
				_ = d(s);
			i = d(_);
		}
		var u = i.cloneNode(!0);
		return (n(u, u), u);
	};
}
function A(r, a) {
	return w(r, a, 'svg');
}
function C(r = '') {
	if (!f) {
		var a = c(r + '');
		return (n(a, a), a);
	}
	var e = o;
	return (e.nodeType !== N && (e.before((e = c())), b(e)), n(e, e), e);
}
function F() {
	if (f) return (n(o, null), o);
	var r = document.createDocumentFragment(),
		a = document.createComment(''),
		e = c();
	return (r.append(a, e), n(a, e), r);
}
function I(r, a) {
	if (f) {
		var e = m;
		(((e.f & T) === 0 || e.nodes.end === null) && (e.nodes.end = o), g());
		return;
	}
	r !== null && r.before(a);
}
const y = '5';
typeof window < 'u' && ((window.__svelte ??= {}).v ??= new Set()).add(y);
export { I as a, n as b, F as c, v as d, A as e, x as f, C as t };
