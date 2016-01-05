package de.treichels.wea.bat64.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import javax.xml.bind.Element;
import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public abstract class GroupList<T> extends Group implements List<T> {
	@XmlAnyElement
	private final List<Element> elements = new ArrayList<Element>();

	private final List<T> delgate = new ArrayList<T>();

	@Override
	public void add(final int index, final T element) {
		delgate.add(index, element);
	}

	@Override
	public boolean add(final T e) {
		return delgate.add(e);
	}

	@Override
	public boolean addAll(final Collection<? extends T> c) {
		return delgate.addAll(c);
	}

	@Override
	public boolean addAll(final int index, final Collection<? extends T> c) {
		return delgate.addAll(index, c);
	}

	@Override
	public void clear() {
		delgate.clear();
	}

	@Override
	public boolean contains(final Object o) {
		return delgate.contains(o);
	}

	@Override
	public boolean containsAll(final Collection<?> c) {
		return delgate.containsAll(c);
	}

	@Override
	public boolean equals(final Object o) {
		return delgate.equals(o);
	}

	@Override
	public T get(final int index) {
		return delgate.get(index);
	}

	@Override
	public int hashCode() {
		return delgate.hashCode();
	}

	@Override
	public int indexOf(final Object o) {
		return delgate.indexOf(o);
	}

	@Override
	public boolean isEmpty() {
		return delgate.isEmpty();
	}

	@Override
	public Iterator<T> iterator() {
		return delgate.iterator();
	}

	@Override
	public int lastIndexOf(final Object o) {
		return delgate.lastIndexOf(o);
	}

	@Override
	public ListIterator<T> listIterator() {
		return delgate.listIterator();
	}

	@Override
	public ListIterator<T> listIterator(final int index) {
		return delgate.listIterator(index);
	}

	@Override
	public T remove(final int index) {
		return delgate.remove(index);
	}

	@Override
	public boolean remove(final Object o) {
		return delgate.remove(o);
	}

	@Override
	public boolean removeAll(final Collection<?> c) {
		return delgate.removeAll(c);
	}

	@Override
	public boolean retainAll(final Collection<?> c) {
		return delgate.retainAll(c);
	}

	@Override
	public T set(final int index, final T element) {
		return delgate.set(index, element);
	}

	@Override
	public int size() {
		return delgate.size();
	}

	@Override
	public List<T> subList(final int fromIndex, final int toIndex) {
		return delgate.subList(fromIndex, toIndex);
	}

	@Override
	public Object[] toArray() {
		return delgate.toArray();
	}

	@SuppressWarnings("hiding")
	@Override
	public <T> T[] toArray(final T[] a) {
		return delgate.toArray(a);
	}
}
