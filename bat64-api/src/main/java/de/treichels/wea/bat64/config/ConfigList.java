package de.treichels.wea.bat64.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class ConfigList<T> extends ConfigElement implements List<T> {
	private final List<T> list = new ArrayList<T>();

	public ConfigList() {
		setTypeinfo(6);
	}

	@Override
	public void add(final int index, final T element) {
		list.add(index, element);
	}

	@Override
	public boolean add(final T e) {
		return list.add(e);
	}

	@Override
	public boolean addAll(final Collection<? extends T> c) {
		return list.addAll(c);
	}

	@Override
	public boolean addAll(final int index, final Collection<? extends T> c) {
		return list.addAll(index, c);
	}

	@Override
	public void clear() {
		list.clear();
	}

	@Override
	public boolean contains(final Object o) {
		return list.contains(o);
	}

	@Override
	public boolean containsAll(final Collection<?> c) {
		return list.containsAll(c);
	}

	@Override
	public boolean equals(final Object o) {
		return list.equals(o);
	}

	@Override
	public T get(final int index) {
		return list.get(index);
	}

	@Override
	public int hashCode() {
		return list.hashCode();
	}

	@Override
	public int indexOf(final Object o) {
		return list.indexOf(o);
	}

	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}

	@Override
	public Iterator<T> iterator() {
		return list.iterator();
	}

	@Override
	public int lastIndexOf(final Object o) {
		return list.lastIndexOf(o);
	}

	@Override
	public ListIterator<T> listIterator() {
		return list.listIterator();
	}

	@Override
	public ListIterator<T> listIterator(final int index) {
		return list.listIterator(index);
	}

	@Override
	public T remove(final int index) {
		return list.remove(index);
	}

	@Override
	public boolean remove(final Object o) {
		return list.remove(o);
	}

	@Override
	public boolean removeAll(final Collection<?> c) {
		return list.removeAll(c);
	}

	@Override
	public boolean retainAll(final Collection<?> c) {
		return list.retainAll(c);
	}

	@Override
	public T set(final int index, final T element) {
		return list.set(index, element);
	}

	@Override
	public int size() {
		return list.size();
	}

	@Override
	public List<T> subList(final int fromIndex, final int toIndex) {
		return list.subList(fromIndex, toIndex);
	}

	@Override
	public Object[] toArray() {
		return list.toArray();
	}

	@Override
	public <E> E[] toArray(final E[] a) {
		return list.toArray(a);
	}
}
